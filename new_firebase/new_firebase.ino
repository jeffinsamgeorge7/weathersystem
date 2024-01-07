#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
36
#include <DHT.h>
#include <SFE_BMP180.h>
#include <Wire.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

//Insert your network credentials
#define WIFI_SSID "Galaxy22"
#define WIFI_PASSWORD "12345678"

// Insert Firebase project API Key
#define API_KEY "AIzaSyCP0D0mg6dYn2GayonAgppCZTlCMaus7ko"

// Insert RTDB URL
#define DATABASE_URL "weather-wise-f8948-default-rtdb.firebaseio.com"

#define DHT_PIN D4

DHT dht(DHT_PIN, DHT11);
SFE_BMP180 pressure;
 
#define ALTITUDE 1655.0

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;
const int rainSensorPin = A0;

const long utcOffsetInSeconds = 19800;
//unsigned long sendDataPrevMillis = 0;
//int count = 0;
//bool signupOK = false;
unsigned long previousMillis = 0;
const unsigned long interval = 2* 60 * 1000; 

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

//Week Days
String weekDays[7]={"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

//Month names
//String months[12]={"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};


void setup(){
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  //
  dht.begin();
  pinMode(rainSensorPin, INPUT);
  /* Assign the API key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;
  //pressure begins
   if (pressure.begin())
    Serial.println("BMP180 init success");
  else
  {

    Serial.println("BMP180 init fail\n\n");
    while(1); // Pause forever.
  }

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("Sign up successful");
    signupOK = true;
  }
  else{
    Serial.printf("Sign up failed: %s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long-running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  timeClient.begin();
}


void loop(){
  timeClient.update();
  time_t epochTime = timeClient.getEpochTime() + 19800;

  String weekDay = weekDays[timeClient.getDay()];

  struct tm *ptm = gmtime ((time_t *)&epochTime); 

  int monthDay = ptm->tm_mday;
  int currentMonth = ptm->tm_mon+1;
  int currentYear = ptm->tm_year+1900;
  int currentHour=timeClient.getHours();
  int currentMinute=timeClient.getMinutes();
  int currentSecond=timeClient.getSeconds();

  //Print complete date:
  String currentDate = String(currentYear) + "-" + String(currentMonth) + "-" + String(monthDay);
  String newTime=String(currentHour)+":"+String(currentMinute);
  //float temperature = dht.readTemperature();
  //float humidity = dht.readHumidity();
  char status;
  double T,P,p0,a;
  
  status = pressure.startTemperature();
  if (status != 0)
  {
    // Wait for the measurement to complete:
    delay(status);
 
    status = pressure.getTemperature(T);
    if (status != 0)
    {
      status = pressure.startPressure(3);
      if (status != 0)
      {
        // Wait for the measurement to complete:
        delay(status);
        status = pressure.getPressure(P,T);
        if (status != 0)
        {
          Serial.println("presure"); 
          Serial.print(P,2); 
          Serial.println("  mb");
        }
        else Serial.println("error retrieving pressure measurement\n");
      }
      else Serial.println("error starting pressure measurement\n");
    }
    else Serial.println("error retrieving temperature measurement\n");
  }
  else Serial.println("error starting temperature measurement\n");
 

  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();

    // Simulate temperature and humidity values (replace with actual sensor data)
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    int pressure = (P);
    int num1 = 1;
    int num2 = 0;
    int rainSensorValue = analogRead(rainSensorPin);
    // Write temperature and humidity data to Firebase
    if (Firebase.RTDB.setFloat(&fbdo, "weather/temperature", temperature)){
      Serial.println("Temperature sent to Firebase: " + String(temperature));
    }
    else {
      Serial.println("Failed to send temperature data: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "weather/humidity", humidity)){
      Serial.println("Humidity sent to Firebase: " + String(humidity));
    }
    else {
      Serial.println("Failed to send humidity data: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "weather/pressure", pressure)){
      Serial.println("Presure sent to Firebase: " + String(pressure));
    }
    else {
      Serial.println("Failed to send humidity data: " + fbdo.errorReason());
    }

    /////
      unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
        if (Firebase.RTDB.setFloat(&fbdo, "weatherstore/"+currentDate+"/"+newTime+"/temperature", temperature)){
      Serial.println("Temperature sent to Firebase: " + String(temperature));
    }
    else {
      Serial.println("Failed to send temperature data: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "weatherstore/"+currentDate+"/"+newTime+"/humidity", humidity)){
      Serial.println("Humidity sent to Firebase: " + String(humidity));
    }
    else {
      Serial.println("Failed to send humidity data: " + fbdo.errorReason());
    }

    if (Firebase.RTDB.setFloat(&fbdo, "weatherstore/"+currentDate+"/"+newTime+"/pressure", pressure)){
      Serial.println("Presure sent to Firebase: " + String(pressure));
    }
    else {
      Serial.println("Failed to send humidity data: " + fbdo.errorReason());
    }
    

if (rainSensorValue < 500) {
  if (Firebase.RTDB.setFloat(&fbdo, "weatherstore/"+currentDate+"/"+newTime+"/rain", num1)) {
    Serial.println("Rain value sent to Firebase: " + String(1));
  } else {
    Serial.println("Failed to send rain data: " + fbdo.errorReason());
  }
} else if (rainSensorValue >= 500) {
  if (Firebase.RTDB.setFloat(&fbdo, "weatherstore/"+currentDate+"/"+newTime+"/rain", num2)) {
    Serial.println("Rain value sent to Firebase: " + String(0));
  } else {
    Serial.println("Failed to send rain data: " + fbdo.errorReason());
  }
} else {
  Serial.println("Invalid rain sensor value");
}

  }
  
    count++;
  }
}
