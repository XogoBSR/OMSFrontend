import { Card, Grid, TextField } from '@mui/material'
import React from 'react'

export default function Note() {
  return (
    <Card>
        
    <TextField fullWidth placeholder='Note' sx={{margin:"5px", height:"50px"}}></TextField>
    
    </Card>
  )
}


