import { Table } from '@mantine/core';
import React from "react";

const FintrackTable = ({
    caption, thead, rows, tfoot
}) => {
    return (<div>
        <Table striped highlightOnHover withBorder withColumnBorders>
            <caption>{caption}</caption>
            <thead>{thead}</thead>
            <tbody>{rows}</tbody>
            <tfoot>{tfoot}</tfoot>
        </Table>
    </div>)

}

export default FintrackTable;