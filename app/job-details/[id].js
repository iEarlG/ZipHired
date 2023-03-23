
import { useCallback, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hooks/useFetch';

const DetailsJob = ["About", "Qualification", "Responsibilities"];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const { data, isLoading, error, refetching } = useFetch('job-details', { job_id: params.id });

    const [refreshing, setRefreshing] = useState(false);
    const [activeJobs, setActiveJobs] = useState(DetailsJob[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetching();
        setRefreshing(false);
    }, []);
    const displayJobsContent = () => {
        switch (activeJobs) {
            case "About":
                return <JobAbout 
                    title="Job Description"
                    info={data[0].job_description ?? "No description available yet"}
                />;
            case "Qualification":
                return <Specifics
                title="Qualification"
                points={data[0].job_highlights?.Qualifications ?? ['No data available yet']}
            />
            case "Responsibilities":
                return <Specifics
                title="Responsibilities"
                points={data[0].job_highlights?.Responsibilities ?? ['No data available yet']}
            />
            default:
            break;
        }
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn 
                    iconUrl={icons.left} 
                    dimension="60%" 
                    handlePress={() => router.back()} 
                />
            ),
            headerRight: () => (
                <ScreenHeaderBtn 
                    iconUrl={icons.share} 
                    dimension="60%" 
                    handlePress={() => router.push("/share")}
                />
            ),
            headerTitle: ""
            }}
        />

        <>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading ? (
                    <ActivityIndicator  size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong. Please try again.</Text>
                ) : data.length === 0 ? (
                        <Text>Job not found.</Text>
                    )
                  : (
                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                        <Company 
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <JobTabs 
                            DetailsJob={DetailsJob}
                            activeJobs={activeJobs}
                            setActiveJobs={setActiveJobs}
                        />

                        {displayJobsContent()}
                    </View>
                )}
            </ScrollView>

            <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"}/>
        </>
    </SafeAreaView>
  )
}

export default JobDetails;