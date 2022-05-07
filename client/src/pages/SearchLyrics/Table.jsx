import React from 'react'
import styles from './app.css'

export const Table = ({data}) => {
    return (
        <table>
            <tbody>
            <h1 style={{color: "#42a0ac"}}>
                Lyrics : 🎶
            </h1>
            <tr>
                <td style={{
                    color: '#FCCAD2FF',
                    textAlign: "center",
                    fontFamily:"monospace",
                    whiteSpace: "pre",
                    lineHeight: 1.6,
                    marginLeft: '50px'
                }}>{data}</td>
            </tr>
            </tbody>
        </table>
    )
}
export default Table;
