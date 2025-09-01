import { useCallback, useEffect, useMemo, useState } from "react";
import { Params } from "../../Types";
import { UseBasicTableFilterHelperOptions } from "../../Types/CoreComponents";

const useBasicTableFilterHelper = ({ initialParams, debounceDelay = 300, sortKey = "userFilter" }: UseBasicTableFilterHelperOptions = {}) => {
  const [pageNumber, setPageNumber] = useState(initialParams?.page ?? 1);
  const [pageSize, setPageSize] = useState(initialParams?.limit ?? 10);
  // const [searchTerm, setSearchTerm] = useState(initialParams?.search ?? "");
  const [sortBy, setSortBy] = useState<string | null>(initialParams?.[sortKey] ?? null);

  // const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  const [params, setParams] = useState<Params>({
    page: pageNumber,
    limit: pageSize,
    // search: searchTerm,
    ...initialParams,
  });

  // Sync search with debounce
  // useEffect(() => {
  //   setParams((prev) => ({
  //     ...prev,
  //     search: debouncedSearchTerm,
  //     page: 1,
  //   }));
  //   setPageNumber(1);
  // }, [debouncedSearchTerm]);

  // Sync sort with dynamic key
  useEffect(() => {
    setParams((prev) => {
      const updatedParams = { ...prev };
      if (sortBy) {
        updatedParams[sortKey] = sortBy; // <-- dynamic key name
      } else {
        delete updatedParams[sortKey];
      }
      return updatedParams;
    });
  }, [sortBy, sortKey]);

  const handlePaginationChange = useCallback((newPage: number, newPageSize: number) => {
    setPageNumber(newPage);
    setPageSize(newPageSize);
    setParams((prev) => ({
      ...prev,
      page: newPage,
      limit: newPageSize,
    }));
  }, []);

  // const handleSetSearch = useCallback((value: string) => setSearchTerm(value), []);
  const handleSetSortBy = useCallback((value: string) => setSortBy(value || null), []);

  return useMemo(
    () => ({
      pageNumber,
      pageSize,
      // searchTerm,
      sortBy,
      params,
      setParams,
      // handleSetSearch,
      handleSetSortBy,
      handlePaginationChange,
    }),
    [pageNumber, pageSize, sortBy, params, handlePaginationChange]
  );
};

export default useBasicTableFilterHelper;
