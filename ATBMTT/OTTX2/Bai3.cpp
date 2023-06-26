#include<bits/stdc++.h>

using namespace std;

bool isPrime(long a){
	for(int i = 2; i <= sqrt(a); i++){
		if(a % i == 0) return false;
	}
	return (a < 2) ? false : true;
}

long exptt(long base, long exp, long N){
	long t = 1L;
	while(exp>0){
		if(exp % 2 != 0) 
			t = (t * base) % N;
		
		base = (base * base) % N;
		exp /= 2;
	}
	return t % N;
}

int main(){
	long a,n,m;
	bool isNguyenTo = false;
	do{
		cout << "Nhap a: "; cin >> a;
		cout << "Nhap n: "; cin >> n;
		cout << "Nhap m: "; cin >> m;
		if(isPrime(a) && isPrime(n) && isPrime(m)) {
			isNguyenTo = true;
		}else {
			cout << "Moi nhap lai 3 so phai la nguyen to" << endl;
		}
	}while(!isNguyenTo);
	cout << a << "^" << n << " mod " << m << " = " << exptt(a,n,m);
	return 0;
}
