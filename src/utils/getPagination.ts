import { useQuery } from './useQuery';

export const usePagination = <T = any>(data: T[], rows: number) => {
  const query = useQuery();

  const pageParam = query.get('page');

  const page = pageParam ? parseInt(pageParam) : 1;

  return {
    currentPage: page,
    numberOfPages: data ? Math.ceil(data.length / rows) : 0,
    data: data.slice((page - 1) * rows, page * rows),
  };
};
