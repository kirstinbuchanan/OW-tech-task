import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Title } from '../../models/Title';
import { usePagination } from '../../utils/getPagination';
import Pagination from '../Pagination/Pagination';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import styles from './DataTable.module.scss';
import { ArrowDownIcon, ArrowUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { orderBy } from 'lodash';

const DataTable: React.FunctionComponent = () => {
  const data = useLoaderData() as Title[];
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);

  const onSort = () => {
    if (!sortDirection) {
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortDirection(undefined);
    }
  };

  const resolvedData = sortDirection ? orderBy(data, 'Title Number', [sortDirection]) : data;

  // NOTE: If the user puts ?page=8 in the URL when there are only 5 pages, the table will be empty.
  // A ZeroState component could be added to handle this to inform the user.
  const { currentPage, data: pagedData, numberOfPages } = usePagination(resolvedData, 5);

  return (
    <TableContainer data-testid="title-table">
      <Table variant="simple" colorScheme="teal" size={['sm', 'md']}>
        <Thead>
          <Tr>
            <Th>
              Title Number{' '}
              <span onClick={onSort} className={styles.sortIcon} data-testid="sort-icon">
                {!sortDirection && <UpDownIcon color="teal" boxSize={3} />}
                {sortDirection === 'asc' && <ArrowDownIcon boxSize={3} color="teal" />}
                {sortDirection === 'desc' && <ArrowUpIcon boxSize={3} color="teal" />}
              </span>
            </Th>
            <Th>Class of Title</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedData?.map((title) => (
            <Tr key={title['Title Number']} className={styles.tableRows} data-testid="title-table-row">
              <LinkTableCell to={`/${title['Title Number']}`}>{title['Title Number']}</LinkTableCell>
              <LinkTableCell to={`/${title['Title Number']}`}>{title.Tenure}</LinkTableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
    </TableContainer>
  );
};

export default DataTable;

interface LinkTableCellProps {
  to: string;
  children: React.ReactNode;
}

// This makes it so that the link is only on the text and not the whole cell as tr must have a child td.
// An onClick handler could be passed to the tr but then React Router's Link could not be used.
const LinkTableCell = ({ to, children }: LinkTableCellProps) => {
  return (
    <Td data-testid="title-table-cell">
      <Link to={to}>{children}</Link>
    </Td>
  );
};
