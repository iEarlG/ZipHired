import { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS, SIZES } from '../../../constants';
import styles from './popularjobs.style';

import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hooks/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJobs, setSelectedJobs] = useState();

  const { data, isLoading, error, refetching } = useFetch('search', { 
    query: 'React Developer',
    num_pages: '1',
    page: '1',
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item?.job_id}`);
    setSelectedJobs(item.job_id);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetching();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container} refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} />} >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>       
            <Text style={styles.headerBtn}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? ( 
          <ActivityIndicator size="large" color={COLORS.primary} /> 
          ) : error ? (
            <Text>Something went wrong. Please try again. API is not working properly!</Text>
          ) : (
            <FlatList 
              data={data}
              renderItem={({ item }) => (
              <PopularJobCard 
                item={item} 
                selectedJobs={selectedJobs} 
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            />
          )}
      </View>
    </View>
  )
}

export default Popularjobs;