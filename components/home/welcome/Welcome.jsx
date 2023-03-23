
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

import { useRouter } from 'expo-router';

import { icons, SIZES } from '../../../constants';
import styles from './welcome.style';

const jobsTypes = ["Full Time", "Part Time", "Contract", "Internship", "Temporary", "Remote"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobTypes, setActiveJobTypes] = useState("Full Time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello EARL!</Text>
        <Text style={styles.welcomeMessage}>find your perfect jobs</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Search for jobs, companies, and more"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick} >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobsTypes}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.tab(activeJobTypes, item)}
              onPress={() => {
                setActiveJobTypes(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobTypes, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default Welcome;