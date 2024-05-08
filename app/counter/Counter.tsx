import { Provider, useDispatch, useSelector } from "react-redux";
import counterSlice from "../../redux/reducers/counter";
import { increment,decrement, incrementByvalue, incrementAsync} from "../../redux/reducers/counter";
import { AppDispatch, RootState } from "../../redux/store/store";
import { View, Text, Pressable } from "react-native";
export default function Counter(){
    const count =useSelector((state:RootState)=>state.counter.count)
    const dispatch=useDispatch<AppDispatch>();
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Count: {count}</Text>
        <Pressable onPress={() => dispatch(increment())} ><Text>Increment</Text></Pressable>
        <Pressable onPress={() => dispatch(decrement())} ><Text>Decrement</Text></Pressable>
        <Pressable onPress={() => dispatch(incrementAsync(5))} ><Text>Increment by 5</Text></Pressable>
      </View>
    );
  }