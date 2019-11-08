import React from "react";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextField} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';

const row = (x,
             i,
             header,
             handleRemove,
             startEditing,
             editIndex,
             handleChange,
             stopEditing) =>{
    const currentEdit = editIndex === i;
    return(
        <TableRow key={`tr-${i}`} selectable={false}>
            {header.map((y, k) =>
                <TableRowColumn key={`trc-${k}`}>
                    {currentEdit
                            ? (
                            <TextField
                                name={y.prop}
                                onChange={e => handleChange(e, y.prop, i)}
                                value={x[y.prop]}
                            />
                        )
                            : (
                            x[y.prop]
                        )}
                </TableRowColumn>
            )}
            <TableRowColumn>
                {currentEdit
                    ?(
                        <CheckIcon onClick={() => stopEditing(i)}/>
                    )
                    : (
                        <EditIcon onClick={() => startEditing(i)}/>
                    )}
            </TableRowColumn>
            <TableRowColumn>
                <DeleteIcon onClick={() => handleRemove(i)}/>
            </TableRowColumn>
        </TableRow>
    )
};

export default ({
                    data,
                    header,
                    handleRemove,
                    startEditing,
                    editIndex,
                    handleChange,
                    stopEditing
                }) =>
    <Table>
        <TableHeader>
            <TableRow>
                {header.map((x, i) =>
                    <TableHeaderColumn key={`thc-${i}`}>
                        {x.name}
                    </TableHeaderColumn>
                )}
                <TableHeaderColumn />
                <TableHeaderColumn />
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((x, i) => row(
                x,
                i,
                header,
                handleRemove,
                startEditing,
                editIndex,
                handleChange,
                stopEditing
            ))}
        </TableBody>
    </Table>;