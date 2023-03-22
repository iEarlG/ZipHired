
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { SIZES } from '../../../constants';
import styles from './tabs.style';

const TabButton = ({ name, activeJobs, onHandleSearchType }) => (
  <TouchableOpacity style={styles.btn(name, activeJobs)} onPress={onHandleSearchType}>
    <Text style={styles.btnText(name, activeJobs)}>{name}</Text>
  </TouchableOpacity>
)

const Tabs = ({ DetailsJob, activeJobs, setActiveJobs }) => {
  return (
    <View style={styles.container}> 
      <FlatList 
        data={DetailsJob}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeJobs={activeJobs}
            onHandleSearchType={() => setActiveJobs(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2  }}
      />
    </View>
  )
}

export default Tabs;