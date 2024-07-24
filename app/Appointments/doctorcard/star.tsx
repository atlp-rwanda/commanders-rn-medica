import React from 'react';
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

interface FiveStarRatingProps {
  selectedStars: number;
  onStarPress: (index: number) => void;
}

const FiveStarRating: React.FC<FiveStarRatingProps> = ({ selectedStars, onStarPress }) => {
  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map((index) => (
        <StarCheckbox
          key={index}
          checked={index < selectedStars}
          onPress={() => onStarPress(index)}
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
