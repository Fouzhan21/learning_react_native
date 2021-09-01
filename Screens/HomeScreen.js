import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
  const width = useWindowDimensions().width;

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      let response = await fetch(
        'https://bucketry.shop/dashboard/API/user/get_recommended.php?=',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: '{"branch_id":"60"}',
        },
      );
      
      let myJsonResponse = await response.json();
      if (myJsonResponse.status === 'success') {
        // console.log(JSON.stringify(myJsonResponse));
        return myJsonResponse.Tribata;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    console.log('mounted');
    (async () => {
      setLoading(true);
      let response = await fetchData();
      if(response){
        setProducts(response)
      }
      setLoading(false);

      console.log(response);
    })();
  }, []);

  return (
    <View style={(tailwind('h-full'), {backgroundColor: '#FFF8E8'})}>
      <View style={tailwind('bg-black rounded-b-xl')}>
        <View style={tailwind('pt-16 mb-10 pl-6 flex flex-row')}>
          <Image
            source={require('../Image/PaneerPizza.png')}
            style={{width: 100, height: 100}}
          />
          <View style={tailwind('flex-grow mx-2')}>
            <Text
              style={{
                color: '#FFEAC0',
                fontSize: 16,
                paddingLeft: 10,
                paddingTop: 6,
                fontWeight: 'bold',
              }}>
              KFC
            </Text>
            <Text
              style={{
                color: '#CBA960',
                fontSize: 10,
                paddingLeft: 10,
                paddingTop: 6,
              }}>
              Fast Food
            </Text>
            <Text
              style={{
                borderBottomColor: '#CBA960',
                borderBottomWidth: 1,
                marginLeft: 10,
              }}></Text>
            <View
              style={tailwind(
                'flex-row justify-between items-center ml-3 py-2',
              )}>
              <View style={tailwind('flex flex-row items-center')}>
                <Icon name="star" size={18} color="#C2A069" />
                <Text
                  style={[tailwind('px-1'), {color: '#CBA960', fontSize: 12}]}>
                  4.3
                </Text>
              </View>

              <Text style={{color: '#CBA960', fontSize: 12}}>Bangalore</Text>
              <Text style={{color: '#CBA960', fontSize: 12}}>2 kms</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={tailwind('py-2 px-4')}>
        <Text style={tailwind('text-xl font-bold pb-4 ')}>Recommended</Text>

        {/* Product Section*/}
        {loading ? <Text>Loading ...</Text> : null}
        {products.map(item => {
          return (
            <ProductCard
              name={item.product_name}
              image={item.img_url}
              price={item.price_variation[0].amount}
              quantity={0}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
