package main

import (
	"context"
	"log"
	"os"

	"github.com/panadirectory/api/server"
)

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://user:password@localhost:5432/panadirectory?sslmode=disable"
	}

	srv, err := server.NewServer(context.Background(), dbURL)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Starting server on :8080")
	if err := srv.Start(":8080"); err != nil {
		log.Fatal(err)
	}
}
