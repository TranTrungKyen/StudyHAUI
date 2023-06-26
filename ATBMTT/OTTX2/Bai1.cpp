#include<bits/stdc++.h>
using namespace std;

int gcd(int a,int b){
	if(a == 0) return b;
	if(b == 0) return a;
	if(a == b) return a;
	if(a > b) return gcd(a-b,b);
	return gcd(a, b-a);
}

int main() {
	int a,b;
	cout << "Nhap a: "; cin >> a;
	cout << "Nhap b: "; cin >> b;
	cout << "GCD(" << a << ", " << b << ") = " << gcd(a,b);
	return 0;
}
