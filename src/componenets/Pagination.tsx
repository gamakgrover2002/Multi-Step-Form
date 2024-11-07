interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="page-container">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={
            currentPage === index + 1
              ? " active"
              : currentPage > index + 1
              ? "filled"
              : "disabled"
          }
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
