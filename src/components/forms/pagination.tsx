// import { useEffect } from "react";

function Pagination(props) {
    const { getPaginatedData, count, page, setPage, lastPage } = props;
    let pageNumbers: number[] = [];
    let endTbd = "";
    let startTbd = "";
    let hider = "";
    if (page > count) {
      addPageNumbersRange(1, count + 1);
      endTbd = "hidden";
      startTbd = "hidden";
      hider = "hidden";
    } else if (count < 5) {
      // if (page<count){
      // console.log(count)
      // console.log(page);
  
      addPageNumbersRange(1, count + 1);
      endTbd = "hidden";
      startTbd = "hidden";
      hider = "hidden";
      // }
    } else if (page == count - 1) {
      addPageNumbers(page - 1, page);
    } else if (page == count) {
      addPageNumbers(page - 2, page - 1);
      endTbd = "hidden";
    } else if (page > 2) {
      addPageNumbersRange(page - 1, page + 2);
    } else if (page > 1) {
      addPageNumbersRange(page, page + 3);
    } else if (page == 1) {
      addPageNumbersRange(page + 1, page + 3);
      startTbd = "hidden";
    }
    function addPageNumbers(...numbers) {
      pageNumbers.push(...numbers);
    }
    function addPageNumbersRange(start, end) {
      for (let i = start; i < end; i++) {
        pageNumbers.push(i);
      }
    }
  
    return (
      <div className="flex justify-center my-8">
        <div>
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-base h-10">
  
              <li
                onClick={() => {
                  if (page == 1) {
                    return;
                  } else {
                    getPaginatedData(1);
                    setPage(1);
                  }
                }}
              >
                <div
                  aria-current="page"
                  className={`flex ${hider} items-center justify-center px-4 h-10 cursor-pointer ${
                    page === 1
                      ? "text-black-600 border border-gray-300 bg-black-50 hover:bg-black-100 hover:text-black-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  } `}
                >
                  {1}
                </div>
              </li>
              <li>
                <div
                  aria-current="page"
                  className={`cursor-pointer  ${startTbd} flex items-center justify-center px-4 h-10 ${"leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} `}
                >
                  ...
                </div>
              </li>
              {pageNumbers.map((data, idx) => {
                return (
                  <div key={idx}>
                    <li
                      onClick={() => {
                        if (page == data) {
                          return;
                        } else {
                          getPaginatedData(data);
                          setPage(data);
                        }
                      }}
                    >
                      <div
                        aria-current="page"
                        className={`flex items-center justify-center cursor-pointer px-4 h-10 ${
                          page === data
                            ? "text-black-600 diabled border border-gray-300 bg-black-50 hover:bg-black-100 hover:text-black-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        } `}
                      >
                        {data}
                      </div>
                    </li>
                  </div>
                );
              })}
              <li>
                <div
                  aria-current="page"
                  className={`cursor-pointer ${hider} ${endTbd} flex items-center justify-center px-4 h-10 ${"leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} `}
                >
                  ...
                </div>
              </li>
              <li
                onClick={() => {
                  if (page == lastPage) {
                    return;
                  } else {
                    getPaginatedData(lastPage);
                    setPage(lastPage);
                  }
                }}
              >
                <div
                  aria-current="page"
                  className={`flex ${hider} items-center justify-center cursor-pointer px-4 h-10 ${
                    page === lastPage
                      ? "text-black-600 border border-gray-300 bg-black-50 hover:bg-black-100 hover:text-black-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  } `}
                >
                  {lastPage}
                </div>
              </li>
              {/* <li>
                <a
                  href=""
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
  
  export default Pagination;