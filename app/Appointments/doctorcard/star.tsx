
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface StarCheckboxProps {
  checked: boolean;
  onPress: () => void;
}

const StarCheckbox: React.FC<StarCheckboxProps> = ({ checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.starButton} onPress={onPress}>
      <Icon name={checked ? 'star' : 'star-o'} size={30} color="#246bfd" />
    </TouchableOpacity>
  );
};

const FiveStarRating: React.FC = () => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarPress = (index: number) => {
    setSelectedStars(index + 1);
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map((index) => (
        <StarCheckbox
          key={index}
          checked={index < selectedStars}
          onPress={() => handleStarPress(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButton: {
    padding: 10,
  },
});

export default FiveStarRating;

