
import React,{useState} from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';


function CustomCheckBox(){
  const [selected, setSelected] = useState(false);

  const handleselect = () =>{
    setSelected(true)
  }

  return (
    <TouchableOpacity onPress={handleselect} style={styles.container}>
      <View style={[styles.outerCircle, selected && styles.outerCircleSelected]}>
        <View style={[styles.innerCircle, selected && styles.innerCircleSelected]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#246BFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircleSelected: {
    borderColor: '#246BFD',
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  innerCircleSelected: {
    backgroundColor: '#246BFD',
  },
});

export default CustomCheckBox;
