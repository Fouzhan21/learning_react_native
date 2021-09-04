import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from '../components/ProductCard';
import { useSelector, useDispatch } from 'react-redux'

export default function HomeScreen() {
  const width = useWindowDimensions().width;
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const IPState = useSelector(state => state.ip)

  useEffect(() => {
    // console.log(IPState)
  }, [])



  useEffect(() => {
    let total = 0;
    for (let item of cart) {
      // console.log(item)
      total += parseInt(item.price_variation[0].amount) * parseInt(item.quantity);
    }
    setTotal(total);
  }, [cart]);

  const incrementAction = id => {
    // console.log('Incremented', id)
    let isInCart = cart.find(
      item => item.price_variation[0].variation_id === id,
    );
    if (isInCart) {
      // Product already in cart increse the quantity
      // 1. Find the index of item in cart
      // 2. Remove that item from the cart
      // 3. Update the new item to the cart
      let index = cart.findIndex(
        item => item.price_variation[0].variation_id === id,
      );
      let cartObj = {
        ...isInCart,
      };
      cartObj.quantity++;
      cart.splice(index, 1, cartObj);
      setCart([...cart]);
    } else {
      let item = products.find(
        item => item.price_variation[0].variation_id === id,
      );
      let newItem = {
        ...item,
      };
      newItem.quantity = 1;
      setCart([...cart, newItem]);
    }
  };
  const decrementAction = id => {
    let isInCart = cart.find(
      item => item.price_variation[0].variation_id === id,
    );
    if (isInCart) {
      console.log(isInCart);
      let index = cart.findIndex(
        item => item.price_variation[0].variation_id === id,
      );
      if (isInCart.quantity === 1) {
        // remove the item
        cart.splice(index, 1);
        setCart([...cart]);
      } else {
        // Reduce the quantity
        let cartObj = {
          ...isInCart,
        };
        cartObj.quantity--;
        cart.splice(index, 1, cartObj);
        setCart([...cart]);
      }
    }
  };

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
    // console.log('mounted');
    (async () => {
      setLoading(true);
      let response = await fetchData();
      if (response) {
        setProducts(response);
      }
      setLoading(false);
    })();
  }, []);

  let getGoogleDNSInfo = async ()=>{
    console.log('Clicked')
    dispatch({
      type:"SAVE_IP",
      payload:"8.8.8.8"
    })

  }

  return (
    <View style={tailwind('h-full')}>

      <View style={tailwind('py-5 bg-white')}>
        <Text style={tailwind('text-center py-2')}>{IPState}</Text>
        <TouchableOpacity onPress={getGoogleDNSInfo} style={[tailwind('bg-red-500 mx-3 rounded-lg p-4')]}>
          <Text style={[tailwind("text-white text-center")]}>get Google DNS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={(tailwind('h-full'), { backgroundColor: '#FFF8E8' })}>
          <View style={tailwind('bg-black rounded-b-xl')}>
            <View style={tailwind('pt-16 mb-10 pl-6 flex flex-row')}>
              <Image
                source={require('../Image/PaneerPizza.png')}
                style={{ width: 100, height: 100 }}
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
                      style={[
                        tailwind('px-1'),
                        { color: '#CBA960', fontSize: 12 },
                      ]}>
                      4.3
                    </Text>
                  </View>

                  <Text style={{ color: '#CBA960', fontSize: 12 }}>
                    Bangalore
                  </Text>
                  <Text style={{ color: '#CBA960', fontSize: 12 }}>2 kms</Text>
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
                  key={item.price_variation[0].variation_id}
                  id={item.price_variation[0].variation_id}
                  name={item.product_name}
                  image={item.img_url}
                  price={item.price_variation[0].amount}
                  incrementAction={incrementAction}
                  decrementAction={decrementAction}
                  cart={cart}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      {cart.length > 0 ? (
        <View style={tailwind('bg-red-600 p-3')}>
          <Text style={tailwind('text-white text-lg')}>
            {cart.length} Items [PRICE]: {total}{' '}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
