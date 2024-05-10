
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CustomCheckBox(){
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.checkbox} onPress={handleToggle}>
      <View style={[styles.checkboxInner, isChecked && styles.checked]} />
      {/* <Text style={styles.label}>{isChecked ? 'Checked' : 'Unchecked'}</Text> */}
    </TouchableOpacity>
  );
};
export default CustomCheckBox

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#246BFD',
    marginRight: 8,
  },
  checked: {
    backgroundColor: '#246BFD',
  },
  label: {
    fontSize: 16,
  },
});
