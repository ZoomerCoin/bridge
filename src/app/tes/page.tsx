"use client"
import React, { useEffect } from 'react'
import { useZoomerValue } from '@/hooks/useZoomerValue'
import { useNativeValue } from '@/hooks/useNativeValue'

const Tes = () => {
  const val = useZoomerValue()
  console.log(val);
  const native = useNativeValue(42161)
  
  // useEffect(()=>{
  //  async function getData (){
  //   const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-Kjh2aK8Y1JXDEe5DLvwnPfRm'}};
  //   const tokenAddress = '0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676'
  //   const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`, options)

  //   const data = await response.json()
  //   if ( response?.status === 200 &&  data){

  //     console.log(data);
  //     const val   = Object.values(data)[0] as {usd : string}
  //    console.log(val.usd);
  //   }
  //  }
  // getData()
  // },[])

  return (
    <div className={`bg-black mt-24 text-white w-full min-h-screen`}>
     this is the value {val}
     and the value of polygon is {native}
    </div>
  )
}

export default Tes

/*
const options = {method: 'GET', headers: {'x-cg-demo-api-key': 'CG-Kjh2aK8Y1JXDEe5DLvwnPfRm'}};

fetch('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676&vs_currencies=usd', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

*/