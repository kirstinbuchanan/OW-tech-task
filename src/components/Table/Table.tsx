import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Title } from "../../models/Title";
import { usePagination } from "../../utils/getPagination";
import Pagination from "../Pagination/Pagination";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import styles from "./Table.module.scss";
import { ArrowDownIcon, ArrowUpIcon, UpDownIcon } from "@chakra-ui/icons";
import { orderBy } from "lodash";

const DataTable: React.FunctionComponent = () => {
  const data = useLoaderData() as Title[];
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc" | undefined
  >(undefined);

  const onSort = () => {
    if (!sortDirection) {
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection(undefined);
    }
  };

  const resolvedData = sortDirection
    ? orderBy(data, "Title Number", [sortDirection])
    : data;

  const {
    currentPage,
    data: pagedData,
    numberOfPages,
  } = usePagination(resolvedData, 5);

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>
              Title Number{" "}
              <span onClick={onSort} className={styles.sortIcon}>
                {!sortDirection && <UpDownIcon color="teal" boxSize={3} />}
                {sortDirection === "asc" && (
                  <ArrowDownIcon boxSize={3} color="teal" />
                )}
                {sortDirection === "desc" && (
                  <ArrowUpIcon boxSize={3} color="teal" />
                )}
              </span>
            </Th>
            <Th>Class of Title</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedData?.map((title) => (
            <Tr key={title["Title Number"]} className={styles.tableRows}>
              <LinkTableCell to={`/${title["Title Number"]}`}>
                {title["Title Number"]}
              </LinkTableCell>
              <LinkTableCell to={`/${title["Title Number"]}`}>
                {title.Tenure}
              </LinkTableCell>
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

const LinkTableCell = ({ to, children }: LinkTableCellProps) => {
  return (
    <Td>
      <Link to={to}>{children}</Link>
    </Td>
  );
};
