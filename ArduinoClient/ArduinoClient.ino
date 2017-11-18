// -----
// REST API CLIENT 
// Understanding Networks
// -----

#include <SPI.h>
#include <WiFi101.h>
#include "arduino_secrets.h"
#include "ArduinoJson.h"

char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

int status = WL_IDLE_STATUS;

// Configs
char server[] = "165.227.188.111";
int port = 9888;
const int buttonPin = 7;
int buttonState = 0;
const int ledPin =  6;  

WiFiClient client;

// Main Setup
void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  while (!Serial);

  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(10000);
  }
  Serial.println("Connected to wifi");

  // Make a request
  //request("POST", "/api/food");
}

// Main Loop
void loop() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    Serial.print('Updating API...');
    request("POST", "/api/food");
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}

// Make a HTTP Request 
void request(String requestType, String endpoint) {
  if (client.connect(server, port)) {
    String PostData = "{\"status\":\"true\",\"token\":\"" + String(TOKEN) + "\"}";
    client.println(requestType + " " + endpoint  + " HTTP/1.1");
    client.println("Host: " + String(server));
    client.println("User-Agent: Arduino/1.0");
    client.println("Connection: close");
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(PostData.length());
    client.println();
    client.println(PostData);
    echo("Data Sent. Connection Closed.");

    char status[32] = {0};
    client.readBytesUntil('\r', status, sizeof(status));
    char endOfHeaders[] = "\r\n\r\n";
    client.find(endOfHeaders);

    const size_t BUFFER_SIZE = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
    DynamicJsonBuffer jsonBuffer(BUFFER_SIZE);
  
    JsonObject& root = jsonBuffer.parseObject(client);
  
    //echo("Extract values");
    //echo(root["alive"].as<char*>());
    client.stop();
  }
}

// Utils to print to serial
void echo(const char* message) {
  Serial.println(message);
}






