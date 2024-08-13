import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import EthereumWallet from '../components/EthereumWallet';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? 
                        <div className='flex flex-column'>
                            <h1>List user Ethereum balance</h1>
                            <EthereumWallet address={user?.eth_pk ?? ""} />
                        </div> : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}
