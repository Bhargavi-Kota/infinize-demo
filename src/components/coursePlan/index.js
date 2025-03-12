'use client';
import React, {useEffect, useState} from 'react';
import CoursePlanData from '@/data/coursePlan/coursePlan.json';
import CoursePlanCard from './coursePlans';
import NoPlan from '../common/noPlan';
import {useParams} from 'next/navigation';

export default function CoursePlan() {
    const [coursePlans, setCoursePlans] = useState([]);
    const {studentId} = useParams();
    useEffect(() => {
        setCoursePlans(CoursePlanData.coursePlans || []);
    }, []);

    return coursePlans.length > 0 ? (
        <CoursePlanCard />
    ) : (
        <NoPlan
            title="There are no course plans"
            description="Get started by creating a new plan."
            button="Create Plan"
            link={`/student/${studentId}/coursePlan`}
        />
    );
}
