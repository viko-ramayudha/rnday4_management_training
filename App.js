import axios from "axios";
import React, { useState, useEffect, Component } from "react";
import { Text, View, Image, Button, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView} from "react-native";


const Profile = (props) => {
  return (
    <View>
      <View style={styles.wrapperprofile}>
        {/* Profile picture (optional) */}
        
        <TouchableOpacity onPress={props.onPress}>
          <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg' }} style={styles.img} />
        </TouchableOpacity>
       

        <View style={styles.txtwrapper}>
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.text}>NIS      : {props.nis}</Text>
            <Text style={styles.text}>Nama  : {props.nama}</Text>
            <Text style={styles.text}>Email   : {props.email}</Text>
            <Text style={styles.text}>Alamat : {props.alamat}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={props.onDelete}>
          <View style={styles.iconWrapper}>
            <Image source={require('./assets/delete.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const App = () => {

  const [nis, setNis] = useState("")
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [alamat, setAlamat] = useState("")
  const [utss, setUtss] = useState([])
  const [btn, setBtn] = useState("Simpan")
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    read()
  }, [])

  const read = () => {
    axios.get('http://192.168.137.1:3000/uts')
    .then(response => {
      console.log(response)
      setUtss(response.data)
      setNis("")
      setNama("")
      setEmail("")
      setAlamat("")
      setBtn("Simpan")
    })
    .catch(err => console.log(err))
  }

  const submit = () => {
    const data = {
      nis: nis,
      nama: nama,
      email: email,
      alamat: alamat
    }
    if (btn === "Simpan") {
      axios.post('http://192.168.137.1:3000/uts', data)
      .then(response => {
        console.log(response)
        read()
      })
      .catch(err => console.log(err))
    } else {
      axios.put(`http://192.168.137.1:3000/uts/${selectedUser.id}`, data)
      .then(response => {
        console.log(response)
        read()
      })
      .catch(err => console.log(err))
    }
  }

  const selectItem = (item) => {
    console.log(item)
    setSelectedUser(item)
    setNis(item.nis)
    setNama(item.nama)
    setEmail(item.email)
    setAlamat(item.alamat)
    setBtn("Update")
  }

  const deleteItem = (item) => {
    console.log(item)
    axios.delete(`http://192.168.137.1:3000/uts/${item.id}`)
    .then(response => {
      console.log(response)
      read()
    })
    .catch(err => console.log(err))
  }

  return (
      <ScrollView>
      <View style={styles.wrapper}>
        <Image source={{ uri: 'https://www.utschool.sch.id/assets/media/logo.png' }} style={styles.logo} />
      </View>
      {/* <ImageBackground source={require('./assets/back.jpg')} style={styles.backg}> */}
      <View style={styles.container}>
        <Text style={{fontWeight: '900', fontSize: 18, color: '#000', marginBottom: 18, alignSelf: 'center'}}>Data Peserta Training IT Batch 6 UTS</Text>
        <TextInput style={styles.input} placeholder="NIS" value={nis} onChangeText={(value) => setNis(value)}/>
        <TextInput style={styles.input} placeholder="Nama Lengkap" value={nama} onChangeText={(value) => setNama(value)}/>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(value) => setEmail(value)}/>
        <TextInput style={styles.input} placeholder="Alamat" value={alamat} onChangeText={(value) => setAlamat(value)}/>
        <TouchableOpacity onPress={submit} style={styles.btn}>
          <Text style={{color: '#000', alignSelf: 'center', fontWeight: 'bold'}}>{btn}</Text>
        </TouchableOpacity>
        <View style={styles.line}/>
        <View style={{paddingVertical: 10,}}>
          {utss.map(uts => {
            return <Profile 
              nis={uts.nis}
              nama={uts.nama}
              email={uts.email}
              alamat={uts.alamat}
              onPress={() => selectItem(uts)}
              onDelete={() => Alert.alert('Peringatan!', 'Anda yakin mau menghapusnya?', [{ text: 'tidak'}, { text: 'Ya', onPress: () => deleteItem(uts) }])}

            />
          })}
      </View>
      </View>
      {/* </ImageBackground> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper : {
    marginTop: 40,
    alignItems: 'left',
    justifyContent: 'center',
    backgroundColor: '#fecf22',
    padding: 10,
  },
  logo: {
    width: 177,
    height: 36,
  },
  container: {
    padding: 20,
  },
  backg: {
    flex: 1,
    resizeMode: 'cover,',
  },
  input:{
    padding: 7,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    // color: '#fff',
  },
  line: {
    height: 2,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  wrapperprofile: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9,
    borderWidth: 1,
    backgroundColor: '#fecf22',
    padding: 10,
  },
  img: {
    alignItems: 'center',
    alignSelf: 'stretch',
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  icon: {
    alignItems: 'right',
    width: 38,
    height: 38,
    marginLeft: -90,
  },
  txtwrapper: {
    marginLeft: 10,
    width: 300,
  },
  btn: {
    borderRadius: 10,
    padding: 13,
    backgroundColor: '#fecf22',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
  },
})

export default App;