namespace FStudyForum.Core.DTOs.Paging;

public class PaginatedDataDTO<T>
{
    public IEnumerable<T> Data { get; set; }
    public int TotalCount { get; set; }

    public PaginatedDataDTO(IEnumerable<T> data, int totalCount)
    {
        Data = data;
        TotalCount = totalCount;
    }
}
