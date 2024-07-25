
import { useLazyQuery, useMutation, useQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_DATA, GET_DATA2, INSERT_PROJECT, PROJECT_DELETE, UPDATE_PROJECT } from './apolloClient/querys'
import { Button, Input } from '@chakra-ui/react';

const Testing = () => {
    const {data} = useSubscription(GET_DATA2,{
        onData : (data) =>{
            console.log('on data', data)
        }
    });
    const {data:projectdata, loading, error, refetch} = useQuery(GET_DATA);

    const [getProData, {data:lazyData}] = useLazyQuery(GET_DATA);

    const [deleteProject] = useMutation(PROJECT_DELETE);
    const [insertProject] = useMutation(INSERT_PROJECT);
    const [updateProject] = useMutation(UPDATE_PROJECT);

    // useEffect(()=>{

    // },[])
    console.log("sub data",data )
    console.log("get data", projectdata);
    console.log("Lazy ", lazyData)
    
    const [proid, setProid] = useState('');
    const [proinfo, setProInfo] = useState({
        category:'',
        is_baseframe:'',
        location:''
    });


    const handleDelete = async () =>{
       const response  = await deleteProject({
            variables:{
                projectid:proid
            }
        })
        console.log("Delete response",response)
    }

    const handleInsert = async () =>{
        console.log("Proinfo", proinfo)
        const response = await insertProject({
            variables:{
                category:proinfo.category,
                is_baseframe:proinfo.is_baseframe,
                location:proinfo.location
            }
        });
        console.log("Insert response",response)
    }

    const handleUpdate = async () =>{
        console.log("Proinfo", proinfo)
        const response = await updateProject({
            variables:{
                category:proinfo.category,
                is_baseframe:proinfo.is_baseframe,
                location:proinfo.location,
                _eq:proid
            }
        });
        console.log("Update response",response)
    }

   return (
    <div>
      Test
      <Input placeholder='Delete Key'  onChange={(e)=>setProid(e.target.value)}/>
      <Input placeholder='Catogary' onChange={(e)=>setProInfo({...proinfo,category:e.target.value})}/>
      <Input placeholder='BaseFrame' onChange={(e)=>setProInfo({...proinfo,is_baseframe:e.target.value})}/>
      <Input placeholder='Location' onChange={(e)=>setProInfo({...proinfo,location:e.target.value})}/>

      <Button onClick={handleInsert}>Insert</Button>
      <Button onClick={handleUpdate}>Update</Button>
      <Button onClick={() => refetch()}>Refetch</Button>
      <Button onClick={() => getProData()}>Lazy</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  )
}

export default Testing