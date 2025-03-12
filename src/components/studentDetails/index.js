'use client';
import {usePathname} from 'next/navigation';
import Details from './details';
import MiniStudentDetails from './mini';
import student from '@/data/studentDetails/studentInfo.json';
import {useEffect, useState} from 'react';

export default function StudentDetails() {
    const pathname = usePathname();
    const pathParts = pathname?.split('/').filter(Boolean) || [];

    const [studentInfo, setStudentInfo] = useState();
    const [isLoading, setIsLoading] = useState(true); // TODO: initialize this to false after integrating with API

    useEffect(() => {
        setStudentInfo(student);
        setIsLoading(false);
    }, []);

    return (
        <div>
            {pathParts.length === 2 ? (
                <Details isLoading={isLoading} studentInfo={studentInfo} />
            ) : (
                <MiniStudentDetails
                    isLoading={isLoading}
                    studentInfo={studentInfo}
                />
            )}
        </div>
    );
}
