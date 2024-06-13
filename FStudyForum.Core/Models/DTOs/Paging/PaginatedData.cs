namespace FStudyForum.Core.Models.DTOs.Paging;

public class PaginatedData<T>
{
    public IEnumerable<T> Data { get; set; }
    public int TotalCount { get; set; }

    public PaginatedData(IEnumerable<T> data, int totalCount)
    {
        Data = data;
        TotalCount = totalCount;
    }
}
