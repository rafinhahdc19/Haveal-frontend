import axios from 'axios';
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup, InputLeftAddon, InputGroup, Divider, Box, Loading, Text } from '@chakra-ui/react'
import Navbar from '@/components/navbar';
import FormatCurrency from '@/functions/moneyconvert';
import Image from 'next/image';
import AuthVerify from '@/components/verifyer';
import Router from 'next/router';
import Cookies from 'js-cookie';

const MyPaymentForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [isCardComplete, setIsCardComplete] = useState(false)
  const [cepInvalid, setcepInvalid] = useState(false)
  const [dataArrays, setdataar] = useState([])
  const [dataArrays2, setdataar2] = useState([])
  const [dataArrays3, setdataar3] = useState([])
  const [Startedpay, setStartedpay] = useState(false)
  const calcularResultado = () => {
    let total = 0;

    dataArrays3.forEach((item) => {
      const { quantity, value } = item;
      const resultadoItem = quantity * value;
      total += resultadoItem;
    });

    return total;
  };
  

  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [contato, setcontato] = useState('');
  const [nome, setnome] = useState('');
  const [rua, setrua] = useState('');
  const [cidade, setcidade] = useState('');
  const [estado, setestado] = useState('');
  const [bairro, setbairro] = useState('');
  const [numero, setnumero] = useState('');
  const [complemento, setcomplemento] = useState('');
  useEffect(() => {
    const itenCa = localStorage.getItem('user_car');
    const itenCar = itenCa ? JSON.parse(itenCa) : [];
    setdataar2(itenCar)

    const getItemcarsda = async () => {
      if(itenCar != []){
        const itensfromdb = await axios.post(process.env.NEXT_PUBLIC_URL+"/getitemcar", {
            slugs:itenCar 
        }).then(function (response){
          setdataar(response.data.itens)
        }).catch(function (error){
          console.log(error)
        })
    }
    }
    getItemcarsda()
    
    

  },[])

  useEffect(() => {
  
    const arrayResultado = [];
    for (const item of dataArrays2) {
      const { slug, quantity } = item;

      const produtoEncontrado = dataArrays.find(produto => produto.slug === slug);

      if (produtoEncontrado) {
        const { slug, nome, desc, imgurl, value } = produtoEncontrado;

        const itemDataArrays2 = dataArrays2.find(item => item.slug === slug);
    
        const quantidadeItem = itemDataArrays2 ? itemDataArrays2.quantidade : 0;
    
        arrayResultado.push({ slug, nome, desc, imgurl, value, quantity });
        setdataar3(arrayResultado)
      }
    }

       
  }, [dataArrays, dataArrays2]);


  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 11) {
      setCpf(value.toString());
    }
  };

  const handleChangeCEP = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); 
    console.log(numericValue.length); 
  
    if (numericValue.length <= 8) { 
      const formattedCep = numericValue.toString();
      setCep(formattedCep); 
  
      if (formattedCep.length === 8) { 
        const response = axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`).then(function (data) {
          if(data.data.erro){
            setcepInvalid(true)
            return
          }
          setcepInvalid(false)
          setrua(data.data.logradouro)
          const siglaParaEstado = {
            AC: 'Acre',
            AL: 'Alagoas',
            AM: 'Amazonas',
            AP: 'Amapá',
            BA: 'Bahia',
            CE: 'Ceará',
            DF: 'Distrito Federal',
            ES: 'Espírito Santo',
            GO: 'Goiás',
            MA: 'Maranhão',
            MT: 'Mato Grosso',
            MS: 'Mato Grosso do Sul',
            MG: 'Minas Gerais',
            PA: 'Pará',
            PB: 'Paraíba',
            PR: 'Paraná',
            PE: 'Pernambuco',
            PI: 'Piauí',
            RJ: 'Rio de Janeiro',
            RN: 'Rio Grande do Norte',
            RS: 'Rio Grande do Sul',
            RO: 'Rondônia',
            RR: 'Roraima',
            SC: 'Santa Catarina',
            SP: 'São Paulo',
            SE: 'Sergipe',
            TO: 'Tocantins',
          };
          const siglaRecebida = data.data.uf;
          const nomeDoEstado = siglaParaEstado[siglaRecebida];
          setestado(nomeDoEstado);
          setcidade(data.data.localidade)
          setbairro(data.data.bairro)
        }).catch(function (error) {
          setcepInvalid(true)
        })
      }
    }
    
  };
  const startPayment = async (clientsecret, id) => {
    const token = Cookies.get('jwt');
    if(
      Startedpay
    ){
      return
    }
    try {
      
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (error) {
        setError(error.message);
      } else {
        
        const confirmStatus = await axios.post(process.env.NEXT_PUBLIC_URL+"/confirmpay",{
          paymentid:id
        },{
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(function (data){
          Router.push("/perfil")
        }).catch(function (error){
          alert("o pagamento não pode ser verificado, entre em contato se for preciso")
        })
  
      } 
  
      
    } catch (error) {
      setError(error.message);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCardComplete) {
      alert('Por favor, preencha as informações do cartão.');
      return;
    }
    if(cepInvalid){
      alert('Por favor, preencha as informações do CEP corretamente.');
      return;
    }
    
    const contatoSubmit = ("+55 "+contato)
    const cpfSubmit = cpf
    const cepSubmit = cep
    const nomeSubmit = nome
    const numeroSubmit = numero
    const complementoSubmit = complemento
    const itensSubmit = dataArrays2
    const token = Cookies.get('jwt');
    if (clientSecret === ''){
      const response = await axios.post(process.env.NEXT_PUBLIC_URL + '/pay', {
        cpf:cpfSubmit,
        cep:cepSubmit,
        contato:contatoSubmit,
        nome:nomeSubmit,
        numero:numeroSubmit,
        complemento:complementoSubmit,
        itens:itensSubmit
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(function (data) {
          startPayment(data.data.clientSecret, data.data.idPay)
          setStartedpay(true)
        })
        .catch(function (error) {
          console.log(error);
        });

  
    
    }
  };
  const resultadoFinal = calcularResultado();
  const routerFunc = () => {
    Router.push('/login')
}
  return (
    <>
    <AuthVerify routerFunction={() => routerFunc()}>
    <header>
      <Navbar>

      </Navbar>
    </header>
    <main className='md:mt-[10rem] mt-[8rem] mb-6 mr-auto ml-auto w-[93%] md:w-[60%] '>
      <div className='m-2'>
        <div className=' w-full'>
                <div className='w-[100%] md:mb-0 bg-white drop-shadow-md rounded-md'>
                  <div className='flex p-4 justify-between'>
                    <h2 className=' text-black font-medium mt-auto mb-auto'>Produtos</h2>
                    

                  </div>
                  
                  <Divider borderBottomColor={"blackAlpha.400"}></Divider>
                  {dataArrays3.length > 0 ? (
                    
                  dataArrays3.map((item) => {
                    return(
                      <div key={item.slug} className='flex w-full'>
                      <div  className='flex p-4 w-full border rounded m-2 border-gray-200'>
                        <div className='rounded '>
                          <Image 
                          className='rounded'            
                          width={"200"}
                          height={"200"}
                          src={item.imgurl}
                          alt='Foto do Produto'
                          borderRadius='lg' />
                          <div className='md:hidden block'>
                          </div>
                        </div>
                        <div className='w-full' >
                          <div className='md:flex'>
                            
                            <Box style={{ wordBreak: 'break-word' }}>
                              <Text className='text-black md:text-2xl text-sm font-medium mx-3' fontSize='xl' textDecor="none" noOfLines={2}>
                                {item.nome}
                            </Text>
                            </Box>
                            <div className='mx-4 ml-auto px-4 py-1 md:pt-2 pt-4'>
                              <p className='text-black'>
                                Quantidade: {item.quantity}
                              </p>

                            </div></div>
                            <div className=' mt-4 px-4'>
                            <div className='bg-gray-50 w-full  md:p-2 p-1 md:mr-0 rounded'>
                              <Text textDecoration="none" color='blue.600' fontSize='xl'>
                                {FormatCurrency(item.value)}
                              </Text>

                            </div>
                          </div>
                        </div>
                        
                      </div></div>)
                      })
                      ) : (
                        
                        
                        Loading
                        
                        
                        
                      )}
                      
                  
                </div>
                
              </div>
      </div>
    <form  onSubmit={handleSubmit}>
      <div className='bg-gray-100/25 m-2 border text-black  rounded-md '>
        
        <h1 className='text-gray-700 justify-center gap-3 flex text-center p-4 md:text-4xl text-xl font-medium'>
          Preenchimento de dados

        </h1>
          <div className="">
            
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm text-gray-700">
              Numero de contato*
            </p>
            <InputGroup>
              <InputLeftAddon>+55</InputLeftAddon>
              <Input onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 14);
                    }} value={contato} onChange={(e) => setcontato(e.target.value)} type='number' placeholder='Numero de telefone' required />
            </InputGroup>
            </div>
          </div>
          <div className="">
            
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm  text-gray-700">
              CPF (Apenas numeros)*
            </p>
              <Input    
              required   
              type="number"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => handleChange(e)} />
            </div>
          </div>

          <div className="">
            
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm  text-gray-700">
              CEP (Apenas numeros)*
            </p>
              <Input 
              isInvalid={cepInvalid}
              errorBorderColor='crimson'
              value={cep} onChange={(e) => handleChangeCEP(e)}
              placeholder='CEP'
              type="text"
              required />
            </div>
          </div>

          <div className="">
            
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm text-gray-700">
              Nome completo*
            </p>
              <Input
              value={nome} onChange={(e) => setnome(e.target.value)}
              placeholder='Nome completo'
              maxLength={150}
              required />
            </div>
          </div>

          <div className="">
            
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm text-gray-700">
              Estado (Auto preenchimento)*
            </p>
              <Input isDisabled placeholder='Estado' value={estado} onChange={(e) => setestado(e.target.value)} maxLength={40} required />
            </div>
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm text-gray-700">
              Cidade (Auto preenchimento)*
            </p>
              <Input isDisabled placeholder='Cidade' value={cidade} onChange={(e) => setcidade(e.target.value)} maxLength={100} required />
            </div>
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm text-gray-700">
              Bairro (Auto preenchimento)*
            </p>
              <Input isDisabled placeholder='bairro' value={bairro} onChange={(e) => setbairro(e.target.value)} maxLength={200} required />
            </div>
            <div className="mt-1 p-2  rounded-lg">
            <p className="block font-medium text-sm text-gray-700">
              Rua (Auto preenchimento)*
            </p>
              <Input isDisabled placeholder='RUA' value={rua} onChange={(e) => setrua(e.target.value)} maxLength={150} required />
            </div>
            <div className="mt-1 p-2  rounded-lg">
              <div className='flex gap-3 justify-between'>
                <div className='w-full'>
                  <p className="block font-medium text-sm text-gray-700">
                    Número
                  </p>
                    <Input value={numero} onChange={(e) => setnumero(e.target.value)} className='w-full' onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 14);
                    }} placeholder='Numero' type="number" />
                </div>
                <div className='w-full'>
                  <p className="block font-medium text-sm text-gray-700">
                    Complemento
                  </p>
                    <Input value={complemento} onChange={(e) => setcomplemento(e.target.value)} className='w-full' maxLength={70} placeholder='Complemento' />
                </div>
              </div>

            </div>
                
            </div>
        <div className='m-2'>
          
          <div className="mb-4">
            <p className="block font-medium text-sm text-gray-700">
              Dados do cartão*
            </p>
            <div className="mt-1 p-2 border rounded-lg shadow-sm">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#333',
                    '::placeholder': {
                      color: '#ccc',
                    },
                  },
                },
              }}
              onChange={(e) => {
                setIsCardComplete(e.complete);
              }}
            />
            </div>
          </div>
          </div>
          <div className=' justify-center flex '>  
            <div className='p-4 text-center'>
              <div className='pb-4 text-center'>
                <Text textDecoration="none" className='text-center' color='blue.600' fontSize='xl'>
                     {"Valor: "+FormatCurrency(resultadoFinal)}
                </Text>
              </div>
            <Button type='submit' className='mr-auto ml-auto' colorScheme='teal' variant='outline'>
              Comprar
            </Button>
            {error && <div>{error}</div>}
          </div>
          </div>  
        </div>
        
    </form>
    </main>
    </AuthVerify>
    </>
  );
};

export default MyPaymentForm;