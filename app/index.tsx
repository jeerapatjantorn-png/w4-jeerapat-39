import { View,Text,TextInput,TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect, use } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { blue } from "react-native-reanimated/lib/typescript/Colors";

export default function Home() {  
    const [value, setValue] = useState("")
    const [animal, setAnimalName] = useState("")

    // เมื่อเปิดให้ฟังก์ชัน loadAnimal ทำงาน
    useEffect(() => {
        loadAnimal()
    },[])

    // ฟังก์ชันบันทึกข้อมูล
    async function saveAnimal(){
       await AsyncStorage.setItem("animal",value)
         setAnimalName(value)
         setValue("")
    }


    // ฟังก์ชันโหลดข้อมูล
    async function loadAnimal(){
        const a = await AsyncStorage.getItem("animal")
        // setAnimalName(a!.toString())
        if(a === ""){
            setAnimalName("")
        }else{
            setAnimalName(a!)
    }
         }
    // สั่งลบข้อมูล
    async function removeAnimal(){
        await AsyncStorage.removeItem("animal")
        setAnimalName("")
    } 

    return (
        <View style={styles.continuer}>
            {/* แสดงข้อความ */}
            <Text style={{fontSize:20,color:'#FFFFFF'}}>
                Animal : {animal}
            </Text>

            {/* กรอกข้อมูล */}
            <TextInput  style={styles.input}  value={value} onChangeText={setValue}/>


            {/* ปุ่มบันทึก */}
            <TouchableOpacity style={{ backgroundColor:'#2ECC71', padding:11 ,borderRadius:20, height:'5%',width:'50%', alignItems:'center',}} onPress={saveAnimal} >
                <Text style={{ color: '#FFFFFF',fontWeight: 'bold',fontSize:16}}>บันทึก</Text>
            </TouchableOpacity> 

            {/* ปุ่มลบข้อมูล */}
            <TouchableOpacity style={{backgroundColor:'rgba(231, 76, 60, 0.2)', padding:11 ,borderRadius:10,height:'5%',width:'15%', alignItems:'center'}} onPress={removeAnimal} >
                <Text style={{ color: '#E74C3C',fontWeight: 'bold',fontSize:16}}>ลบ</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    continuer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:20,
        backgroundColor:'#333',
    },
    input:{
        backgroundColor:'#1A1A1A',
        borderWidth:2,
        width:"80%",
        height:50,
        borderRadius:8,
        color:'white'
    }
})