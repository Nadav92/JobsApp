using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{

    public class MessagesRepository : IMessagesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessagesRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessageForUser(MessageParams messageParams)
        {
            var query = _context.Messages
            .OrderByDescending(m => m.MessageSent)
            .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == messageParams.Username),
                "Outbox" => query.Where(u => u.Sender.UserName == messageParams.Username),
                _ => query.Where(u => u.Recipient.UserName == messageParams.Username && u.DateRead == null),
            };

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);
            return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
        {
            var messages = await _context.Messages
            .Include(u => u.Sender).ThenInclude(p => p.Photos)
            .Include(u => u.Recipient).ThenInclude(p => p.Photos)
            .Where(m =>
                m.RecipientUsername == currentUsername && m.SenderUsername == recipientUsername ||
                m.SenderUsername == currentUsername && m.RecipientUsername == recipientUsername)
            .OrderBy(m => m.MessageSent)
            .ToListAsync();

            if(await updateUnread(messages, currentUsername) == -1){
                throw new Exception("Could not save to DB all the data");
            }
                return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<bool> SaveAlChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        private async Task<int> updateUnread(List<Message> messages, string currentUsername)
        {
            var unReadMessages = messages.Where(m => m.DateRead == null &&
                       m.Recipient.UserName == currentUsername).ToList();

            if (unReadMessages.Any()){
                foreach (var um in unReadMessages) um.DateRead = DateTime.Now;
                var rtn = await _context.SaveChangesAsync();
                if(rtn < unReadMessages.Count) return -1;
            }
            return 1;
        }
    }
}