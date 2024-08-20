'use client'

import { db } from "@/config/firebase";
import parseFireTime from "@/config/parseFireTime";
import { AppBar, Box, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ message: string, createdAt: { seconds: number } }[]>([]);
  const [datalength, setDataLength] = useState<number|null>(null);

  const dataCollectionRef = collection(db, "data");
  const q = query(dataCollectionRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const currentData: { message: string, createdAt: { seconds: number } }[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if ('message' in data && 'createdAt' in data) {
        currentData.push({ message: data.message, createdAt: data.createdAt });
      }
    });
    setData(currentData);
  });

  useEffect(() => {
    return () => unsubscribe()
  },[]);

  useEffect(() => {
    if(datalength === null){
      setDataLength(data.length);
    } else if(data.length !== datalength){
      setDataLength(data.length);
      enqueueSnackbar(`${data[0].message} just now`)
    }
  },[data])
  
  return (
    <Box sx={{ textAlign: "center" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ py:1 }}>Smart Safe System</Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <Container maxWidth="sm" sx={{ mt: 1 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index)=>(
                <TableRow key={index}>
                  <TableCell>{item.message}</TableCell>
                  <TableCell align="right">{moment(parseFireTime(item.createdAt)).fromNow()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
