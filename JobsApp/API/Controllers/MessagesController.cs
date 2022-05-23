using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extansions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MessagesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();
            if (username == createMessageDto.RecipientUsername.ToLower())
            {
                return BadRequest("You cant send message to yourself");
            }

            var sender = await _unitOfWork.UserRepository.GetUserByUserNameAsync(username);
            var recipient = await _unitOfWork.UserRepository.GetUserByUserNameAsync(createMessageDto.RecipientUsername);
            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                SenderKnownAs = sender.KnownAs,
                RecipientKnownAs = recipient.KnownAs,
                Content = createMessageDto.Content,
                EmployerOrEmployee = recipient.EmployerOrEmployee

            };

            _unitOfWork.MessagesRepository.AddMessage(message);
            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to send message");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();
            var messages = await _unitOfWork.MessagesRepository.GetMessageForUser(messageParams);
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
            return Ok(messages);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();
            var message = await _unitOfWork.MessagesRepository.GetMessage(id);


            if (message == null) return NotFound();
            if (message.SenderUsername != username && message.RecipientUsername != username) return Unauthorized();

            if (message.SenderUsername == username) message.SenderDeleted = true;
            else message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted) _unitOfWork.MessagesRepository.DeleteMessage(message);

            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Failed to delete the message");
        }

    }
}