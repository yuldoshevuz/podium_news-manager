export class Paginator<T> {
  constructor(
    private readonly data: T[],
    private readonly totalItems: number,
    private readonly page: number,
    private readonly limit: number,
  ) {}

  build() {
    const totalPages = Math.ceil(this.totalItems / this.limit);
    const currentPageSize = this.data.length;
    const availablePages = Math.max(totalPages - this.page, 0);

    return {
      items: this.data,
      pagination: {
        total_pages_count: totalPages,
        current_page_number: this.page,
        current_page_size: currentPageSize,
        available_pages: availablePages,
        total_items_count: this.totalItems,
      },
    };
  }
}
