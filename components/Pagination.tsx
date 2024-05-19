'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
} from 'lucide-react';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({
  itemCount,
  pageSize,
  currentPage,
}: {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={(curr) => changePage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage >= pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage >= pageCount}
          onClick={() => changePage(pageCount)}
        >
          <ChevronLast />
        </Button>
      </div>
      <div>
        <p>
          Page {currentPage} of {pageCount}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
