import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';

const Index = lazy(() => import('./pages/Index'));

export default function Router() {

    return (
        <Suspense fallback={
                <Flex height="100vh" align="center" justify="center">
                    <Spinner boxSize={24} speed="0.65s" thickness="5px"/>
                </Flex>
        }>
            <Routes>
                <Route exact path="/" end element={<Index />} />
            </Routes>
        </Suspense>
      );
}
