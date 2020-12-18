package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

var (
	// DefaultHTTPGetAddress Default Address
	DefaultHTTPGetAddress = "https://checkip.amazonaws.com"

	// ErrNoIP No IP found in response
	ErrNoIP = errors.New("No IP in HTTP response")

	// ErrNon200Response non 200 status code in response
	ErrNon200Response = errors.New("Non 200 Response found")
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	type RequestBody struct {
		HashToPin string `json:"hashToPin"`
	}
	var body RequestBody
	err := json.Unmarshal([]byte(request.Body), &body)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	client := &http.Client{}
	payload, err := json.Marshal(body)
	if err != nil {
		fmt.Println(err)
		return events.APIGatewayProxyResponse{}, err
	}

	fmt.Println(string(payload))
	req, err := http.NewRequest(
		"POST",
		"https://api.pinata.cloud/pinning/pinByHash",
		bytes.NewBuffer(payload),
	)
	if err != nil {
		fmt.Println(err)
		return events.APIGatewayProxyResponse{}, err
	}

	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("pinata_api_key", os.Getenv("PINATA_API_KEY"))
	req.Header.Add("pinata_secret_api_key", os.Getenv("PINATA_SECRET_API_KEY"))
	res, err := client.Do(req)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}
	fmt.Println(res)

	if res.StatusCode != 200 {
		return events.APIGatewayProxyResponse{}, ErrNon200Response
	}

	responseBody := new(bytes.Buffer)
	_, err = responseBody.ReadFrom(res.Body)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 200,
		}, nil
	}
	return events.APIGatewayProxyResponse{
		Body:       fmt.Sprint(string(responseBody.Bytes())),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(handler)
}
