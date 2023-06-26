#include<bits/stdc++.h>

using namespace std;

int gcd(int a, int m){
	if(a == 0 || m == 0) return a + m;
	if(a == m) return a;
	if(a > m) return gcd(a - m, m);
	return gcd(a, m - a);
}

int modInverse(int a, int m){
	int m0 = m;
	int y = 0, x = 1;
	
	if(m == 1) return 0;
	
	while(a > 1){
		int q = a / m;
		int t = m;
		
		m = a % m, a = t;
		t = y;
		
		y = x - q * y;
		x= t;
		
	}
	if( x < 0) x += m0;
	return x;	
}

int main(){
	int a, m;
	bool isNguyenToCungNhau = false;
	do{
		cout << "Nhap a: "; cin >> a;
		cout << "Nhap m: "; cin >> m;
		if(gcd(a,m) == 1) {
			isNguyenToCungNhau = true;
		}else {
			cout << "Moi nhap lai 2 so phai la nguyen to cung nhau" << endl;
		}
	}while(!isNguyenToCungNhau);
	cout << a << "^-1 mod " << m << " = " << modInverse(a,m);
	return 0;
}
