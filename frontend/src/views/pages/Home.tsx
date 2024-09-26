import React, { useRef, useMemo, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { REGEXEMAIL, REGEXPASSWORD } from '../../service/config/config';
import Modal from 'react-native-modal'; // Modal personalizado

const RegisterScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%', '80%', '90%'], []); // Me permite controlar la propiedad bottomshet

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Este es el estado de manejo del icono

  const [errors, setErrors] = useState<FormErrors>({});   //  validacion y tipo de error desde aqui
  const [isModalVisible, setModalVisible] = useState(false); // Estado para manejar el modal
  const [isSuccess, setIsSuccess] = useState(false); // Estado para el éxito del registro

  type FormErrors = {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
  };
  // Validación del formulario
  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {}; // Especificar el tipo de newErrors

    // Validar el nombre
    if (!name.trim()) {
      newErrors.name = 'El nombre completo es requerido';
      isValid = false;
    }

    // Validar el tel:
    if (!phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
      isValid = false;
    }

    // Validar correo electrónico
    if (!email.trim()) {
      newErrors.email = 'Correo electrónico es requerido';
      isValid = false;
    } else if (!REGEXEMAIL.test(email)) {  // Validar formato del correo
      newErrors.email = 'Correo Electronico no valido';
      isValid = false;
    }

    // Validar contraseña
    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else if (!REGEXPASSWORD.test(password)) {
      newErrors.password = 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setIsSuccess(true);  // Indicar que el registro fue exitoso
      setModalVisible(true); // Mostrar el modal
      //console.log("bien");            // Aquí la aaccion del boton de regisster. ya no se usa y se cambia por el modal
    }
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* lo esta aqui es el contenedor principal, solo utilice las propiedades de arriba para que el circulo quede en la esquina */}
      <View style={styles.container}>
        {/* circulo */}
        <View style={styles.circulo}></View>

        {/* cuadricula */}
        <View style={styles.cuadricula}>
          <View style={styles.grid}>

            <View style={[styles.line, styles.vertical, { left: '11.11%' }]} />
            <View style={[styles.line, styles.vertical, { left: '22.22%' }]} />
            <View style={[styles.line, styles.vertical, { left: '33.33%' }]} />
            <View style={[styles.line, styles.vertical, { left: '44.44%' }]} />
            <View style={[styles.line, styles.vertical, { left: '55.55%' }]} />
            <View style={[styles.line, styles.vertical, { left: '66.66%' }]} />
            <View style={[styles.line, styles.vertical, { left: '77.77%' }]} />
            <View style={[styles.line, styles.vertical, { left: '88.88%' }]} />

            <View style={[styles.line, styles.horizontal, { top: '12.5%' }]} />
            <View style={[styles.line, styles.horizontal, { top: '25%' }]} />
            <View style={[styles.line, styles.horizontal, { top: '37.5%' }]} />
            <View style={[styles.line, styles.horizontal, { top: '50%' }]} />
            <View style={[styles.line, styles.horizontal, { top: '62.5%' }]} />
            <View style={[styles.line, styles.horizontal, { top: '75%' }]} />
            <View style={[styles.line, styles.horizontal, { top: '87.5%' }]} />
          </View>
        </View>

        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheet}
          enablePanDownToClose={false}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={true}
        >
          <Text style={styles.crear}>Crear una cuenta</Text>

          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Número de Teléfono</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Contraseña</Text>
          <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible} // Controla si el texto es visible o no
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Cambia la visibilidad de la contraseña
            >
              <Icon
                name={isPasswordVisible ? 'visibility' : 'visibility-off'} // Cambiado para usar MaterialIcons
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <View style={styles.contenedor_boton}>
            <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
              <Text style={styles.signUpButtonText}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        {/* Modal personalizado */}
        <Modal isVisible={isModalVisible} animationIn="bounceIn" animationOut="fadeOut" backdropOpacity={0.6}>
          <View style={styles.modalContent}>
            <Icon name={isSuccess ? 'check-circle' : 'error'} size={60} color={isSuccess ? '#4BB543' : 'red'} />
            <Text style={styles.modalText}>
              {isSuccess ? 'Usuario guardado satisfactoriamente' : 'Error en el registro'}
            </Text>
            <TouchableOpacity onPress={closeModal} style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#28D6D3',
  },

  container: {
    flex: 1,
    backgroundColor: '#28D6D3',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  circulo: {
    width: 160,
    height: 320,
    borderRadius: 150,
    backgroundColor: '#2F8FC0',
    position: 'absolute',
    top: -150,  //mueve el circulo mas arriba
    left: -120,   //mueve el circulo mas a la izquierda
    transform: [{ rotate: '-50deg' }],  // rota algo
  },

  cuadricula: {
    position: 'absolute',
    top: 150,
    left: 220,
    width: 170,
    height: 170,
  },
  grid: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  line: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
  horizontal: {
    height: 1,
    width: '100%',
  },

  //estilos del bottomshet
  crear: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 1, // Espacio label e input
    alignSelf: 'center', // Alinea el texto con el input
    width: '90%', // Mantiene la misma alineación de los inputs
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: 'gray', // Color del borde
    borderWidth: 1,
    width: '90%',  // ancho del input
    alignSelf: 'center', // Centra el input
  },
  //estilos del icono del ojito
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },

  bottomSheet: {
    backgroundColor: 'white',
    borderRadius: 25,
  },

  contenedor_boton: {
    width: '90%', // Establece el ancho del botón
    alignSelf: 'center', // Centra el botón en el contenedor
    marginTop: 30,//es el espacio que da entre el boton registrate
  },
  signUpButton: {
    backgroundColor: '#3CABE2', //el color de los botones el principal
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
  // Estilo para mensajes de error
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red', // Cambiar el borde a rojo en caso de error
  },

  // Estilos del modal personalizado por mi, ojitos, tienes que cambiar el estilo que necesites. jejeje ;)
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, color: '#333', marginVertical: 15, textAlign: 'center' },
  button: { backgroundColor: '#4BB543', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8, marginTop: 20 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});


export default RegisterScreen;