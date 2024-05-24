import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from 'expo-router'

export interface IArticleProps {
    title?:string,
    date?:string,
    id?:number,
    image?:any,
  category?: string
  content?:string[]

}
 
export default function ArticleCard({article}:{article:IArticleProps}) {
    const navigation = useNavigation<any>();
  return (
    <View style={{display:"flex",flexDirection:"row",padding:10,paddingLeft:10,gap:10,maxWidth:"100%"}}>
      
              <TouchableOpacity onPress={()=>navigation.navigate("ArticlesDetails" ,{ id: article?.id })}>
                <Image style={{ height: 120, width: 120,borderRadius:20 }} source={article.image} />
                </TouchableOpacity>
              <View style={{ paddingRight: 15,display:"flex",justifyContent:"space-between" }}>
                <TouchableOpacity>
                  <Text style={{ color: "#424242", fontSize: 10 }}>{article.date}</Text>
                </TouchableOpacity>
                <View style={{flexWrap:"wrap",maxWidth:"82%",width:"95%"}}>
                  <TouchableOpacity onPress={()=>navigation.navigate("ArticlesDetails",{ id: article?.id })}>

                    <Text style={{ fontSize: 16, fontFamily:"UrbanistBold", color: "#212121" }} numberOfLines={3}>{article.title}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{ color: "#246BFD", fontSize: 10, backgroundColor: "#E0E7FF", borderRadius: 6, height: 24, width: 59, textAlign: "center", padding: 5, marginTop: 10,fontFamily:"UrbanistMedium"}}>{article.category}</Text>
              </View>
              </View>
  )
}



const styles = StyleSheet.create({
    date:{
      color:"#246BFD",
      fontSize:10,
      backgroundColor:"rgba(0,0,0,0.5)",
      borderRadius:6,
      // height:24,
      width:59,
      textAlign:"center",
      padding:4,
      // margin:10,
      fontFamily:"UrbanistRegular",
    position:"relative",

    },
    container:{
        display:"flex",
        flexDirection:"row",
        gap:2,
        marginBottom:20,
        justifyContent:"space-between",
        padding:5,
        backgroundColor:"aqua",
        // marginRight:10,
        // overflow:"hidden"
    },
    constainer2 :{
        display:"flex",
        justifyContent:"space-between"
    },
    description: {
        fontSize: 14,
        color: '#000',
        display:"flex",
        marginRight: 10,
        // lineHeight: 20, // Adjust the line height for better readability
        // flexShrink: 1, // Allow the text to shrink if necessary
        flexWrap: 'wrap', // Ensure the text wraps properly
      },
  });
  


// <ScrollView style={{marginTop:10,backgroundColor:"red",width:"auto",padding:2}} >
//           {articles.map(article=>{
//             const des= 
//             return <View key={article.id}style={{display:"flex",flexDirection:"row",padding:10,paddingLeft:10,gap:10,marginLeft:5}}>
//             <TouchableOpacity onPress={()=>navigation.navigate("ArticlesDetails"as never)}><Image style={{height:120,width:120}}source={article.image}/></TouchableOpacity>
            
//              <View style={{padding:0}} className='flex  justify-between'>
//               
               
//                {/* <TouchableOpacity onPress={()=>navigation.navigate("ArticlesDetails"as never)}><Text style={{fontSize:16,fontFamily:"UrbanistBold"}}>{des}</Text></TouchableOpacity> */}
              
//               <Text style={{}}>{des}</Text>
//               <Text className="bg-primary-50"style={styles.date}>Covid-19</Text>
               
//              </View>
             
//             </View>
//           })}
        
//         </ScrollView>