import { Table, Title } from '@mantine/core';
import React from "react";

interface IFintrackTableProps {
    caption?: string | React.ReactNode
    thead: React.ReactNode,
    rows: React.ReactNode,
    tfoot?: string | number | React.ReactNode
}

const FintrackTable: React.FC<IFintrackTableProps> = ({
    caption, thead, rows, tfoot
}) => {
    return (
        <div>
            <Title c="blue" mb={10} order={2}>Favori Kripto Paralarım</Title>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <caption>{caption}</caption>
                <thead>{thead}</thead>
                <tbody>{rows}</tbody>
                <tfoot>{tfoot}</tfoot>
            </Table>
        </div>)

}

export default FintrackTable;