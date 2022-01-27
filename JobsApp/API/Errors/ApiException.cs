namespace API.Errors
{
    public class ApiException
    {
        public int StatusCose { get; }
        public string Message { get; }
        public string Details { get; }
        public ApiException(int statusCose, string message = null, string details = null)
        {
            StatusCose = statusCose;
            Message = message;
            Details = details;
        }
    }
}