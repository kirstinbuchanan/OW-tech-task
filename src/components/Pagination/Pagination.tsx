import { Button, Flex, Spacer } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  numberOfPages: number;
  currentPage: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  numberOfPages,
}) => {
  return (
    <Flex className={styles.pagination}>
      <Link to={`/?page=${currentPage - 1}`}>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme="teal"
          disabled={currentPage === 1}
        >
          Previous page
        </Button>
      </Link>
      <Spacer />
      <Link to={`/?page=${currentPage + 1}`}>
        <Button
          colorScheme="teal"
          rightIcon={<ArrowForwardIcon />}
          disabled={currentPage >= numberOfPages}
        >
          Next page
        </Button>
      </Link>
    </Flex>
  );
};

export default Pagination;
