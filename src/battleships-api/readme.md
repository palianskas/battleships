# setup

1. Install dotnet sdk https://dotnet.microsoft.com/en-us/download
2. Setup your dotnet environment
3. Setup database
    1. Install MariaDB v10.9.3 (version that comes with Xampp *might* work)
	  2. Import `database/import.sql` to a database named `battleships`
4. Run `dotnet run` in this dir
5. Check if `https://localhost:<port>/test` returns "Hello world!" string
