<script src="https://js.tosspayments.com/v1"></script>
<script>
  const tossPayments = TossPayments('test_ck_DnyRpQWGrN91O9OdAkeLVKwv1M9E');
  tossPayments.requestPayment('카드', {
    amount: 5000,
    orderId: 'order_' + new Date().getTime(),
    orderName: '샘플 상품',
    customerName: '홍길동',
    successUrl: 'http://localhost/application/payment/success',
    failUrl: 'http://localhost/application/payment/fail'
  });
</script>