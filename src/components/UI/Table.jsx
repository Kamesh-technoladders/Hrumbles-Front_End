import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, useColorModeValue, IconButton, Collapse } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const CustomTable = ({ columns, data, variant = "simple" }) => {
  const bg = useColorModeValue("box.bgboxlight", "box.bgboxdark");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");
  
  const variants = {
    simple: {
      border: "1px solid",
      borderColor,
      borderRadius: "md",
    },
    striped: {
      variant: "striped",
      colorScheme: useColorModeValue("gray", "blackAlpha"),
    },
    bordered: {
      border: "2px solid",
      borderColor,
      borderRadius: "lg",
    },
    nested: {
      bg: "transparent",
      boxShadow: "none",
    },
  };

  return (
    <TableContainer bg={bg} borderRadius="md" boxShadow="md" p={4}>
      <Table {...variants[variant]}>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col} color={textColor}>{col}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} row={row} columns={columns} textColor={textColor} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const TableRow = ({ row, columns, textColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Tr>
        {row.children && (
          <Td>
            <IconButton
              icon={isExpanded ? <FiChevronDown /> : <FiChevronRight />}
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              aria-label="Expand Row"
            />
          </Td>
        )}
        {columns.map((col) => (
          <Td key={col} color={textColor}>{row[col]}</Td>
        ))}
      </Tr>
      {row.children && (
        <Tr>
          <Td colSpan={columns.length + 1}>
            <Collapse in={isExpanded} animateOpacity>
              <Table size="sm">
                <Thead>
                  <Tr>
                    {columns.map((col) => (
                      <Th key={col} color={textColor}>{col}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {row.children.map((child, index) => (
                    <Tr key={index}>
                      {columns.map((col) => (
                        <Td key={col} color={textColor}>{child[col]}</Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Collapse>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default CustomTable;