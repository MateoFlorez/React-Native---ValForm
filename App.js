import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form'; // componentes permiten la validacion de la informacion de TextInput
import { TextInput } from 'react-native-web';


export default function App() {
  // Definir los datos del formulario
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      fullname: '',
      email: '',
      password: '',
      age: '',
      date: ''
    }
  })

  // Metodo para capturar los datos - onSubmit
  const onSubmit = data => console.log(data)

  return (
    <View style={styles.container}>

      {/* Campo fullname */}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[A-Za-zÑñáóéíú ]+$/i,
          maxLength:25,
          minLength:5
        }}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={styles.inputs}
            placeholder='Nombre completo'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='fullname'
      />
      {errors.fullname?.type == "required" && <Text style={{color:'red'}}>Este campo es obligatorio</Text>}
      {errors.fullname?.type == "pattern" && <Text style={{color:'red'}}>Solo debe contener letras y/o espacios</Text>}
      {errors.fullname?.type == "maxLength" && <Text style={{color:'red'}}>No debe pasar los 25 caracteres</Text>}
      {errors.fullname?.type == "minLength" && <Text style={{color:'red'}}>Debe tener minimo 5 caracteres</Text>}

      {/* Campo email */}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        }}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={styles.inputs}
            placeholder='Email'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='email'
      />
      {errors.email?.type == "required" && <Text style={{color:'red'}}>Este campo es obligatorio</Text>}
      {errors.email?.type == "pattern" && <Text style={{color:'red'}}>Ingrese un correo electronico válido</Text>}

      {/* Campo edad */}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^[0-9]*(\.?)[ 0-9]+$/,
          max:60,
          min:18
        }}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={styles.inputs}
            placeholder='Edad'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='edad'
      />
      {errors.edad?.type == "required" && <Text style={{color:'red'}}>Este campo es obligatorio</Text>}
      {errors.edad?.type == "pattern" && <Text style={{color:'red'}}>Este campo debe contener solo número</Text>}
      {errors.edad?.type == "max" && <Text style={{color:'red'}}>La edad debe ser entre 18 y 60 años</Text>}
      {errors.edad?.type == "min" && <Text style={{color:'red'}}>La edad debe ser entre 18 y 60 años</Text>}

      {/* Campo password */}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/ 
        }}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={styles.inputs}
            placeholder='Password'
            secureTextEntry={true}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='password'
      />
      {errors.password?.type == "required" && <Text style={{color:'red'}}>Este campo es obligatorio</Text>}
      {errors.password?.type == "pattern" && <Text style={{color:'red'}}>Debe ser entre 8 y 15 caracteres, una mayuscula y un caracter especial</Text>}
      
      {/* Campo date */}
      <Controller
        control={control}
        rules={{
          required:true,
          pattern:/^([012][1-9]|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
        }}
        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={styles.inputs}
            placeholder='Birth date'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name='date'
      />
      {errors.date?.type == "required" && <Text style={{color:'red'}}>Este campo es obligatorio</Text>}
      {errors.date?.type == "pattern" && <Text style={{color:'red'}}>formato: dd/mm/aaaa</Text>}

      <TouchableOpacity
        style={{backgroundColor:'green', padding:6, borderRadius:5, marginTop:20}}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{color:'white'}}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    padding:10,
    borderWidth:1,
    borderColor:'green',
    textAlign:'center',
    borderRadius:5,
    color:'black',
    marginBottom:10
  }
});
