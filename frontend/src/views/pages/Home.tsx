import React, { useRef, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen: React.FC = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%'], []);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Welcome2'); // Navega a la segunda pantalla después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonte
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>BIENVENIDO!</Text>
      </View>
      <View style={styles.circulo}></View>
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
      <Image
        source={require('../../assets/welcome.jpg')}
        style={styles.image}
      />
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheet}
        enablePanDownToClose={false}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.buttonText}>HOLA!</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28D6D3',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    right: 80,
    top: 20,
  },
  circulo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#3CABE2',
    position: 'absolute',
    top: 20,
    left: 40,
    marginTop: 70,
  },
  cuadricula: {
    position: 'absolute',
    top: 150,
    left: 110,
    width: 180,
    color: '#3CABE2',
    height: 180,
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
    marginTop: 310,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderRadius: 25,
  },
  bottomSheetContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'grey',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;