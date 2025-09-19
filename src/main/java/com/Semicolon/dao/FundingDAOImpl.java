package com.Semicolon.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;

import com.Semicolon.command.PageMaker;
import com.Semicolon.dto.FundingVO;

public class FundingDAOImpl implements FundingDAO{

	private SqlSession session;
	public FundingDAOImpl(SqlSession session) {
		this.session = session;
	}
	@Override
	public List<FundingVO> selectSearchFundingList(PageMaker pageMaker) throws SQLException {

		int offset =pageMaker.getStartRow()-1;
		int limmit = pageMaker.getPerPageNum();
		
		RowBounds rows = new RowBounds(offset,limmit);
		
		return session.selectList("Funding-Mapper.selectSearchFundingList",pageMaker,rows);
	}
	
	@Override
	public int selectSearchFundingListCount(PageMaker pageMaker) throws SQLException {
		return session.selectOne("Funding-Mapper.selectSearchFundingListCount",pageMaker);
	}
	@Override
	public FundingVO selectFundingByFno(int fno) throws SQLException {
		return session.selectOne("Funding-Mapper.selectFundingByFno",fno);
	}
	@Override
	public int selectFundingSeqNext() throws SQLException {		
		return  session.selectOne("Funding-Mapper.selectFundingSeqNext");
	}
	@Override
	public void insertFunding(FundingVO funding) throws SQLException {
		session.insert("Funding-Mapper.insertFunding",funding);
		
	}
	@Override
	public void updateFunding(FundingVO funding) throws SQLException {
		session.update("Funding-Mapper.updateFunding",funding);
		
	}
	@Override
	public void increaseViewCnt(int fno) throws SQLException {
		session.update("Funding-Mapper.increaseViewCnt",fno);
		
	}
	@Override
	public void deleteFunding(int fno) throws SQLException {
		session.delete("Funding-Mapper.deleteFunding",fno);		
	}
	 @Override
	    public List<FundingVO> selectListOrderBy(String orderBy, PageMaker pageMaker) throws Exception {
	        Map<String, Object> params = new HashMap<>();
	        params.put("orderBy", orderBy);
	        params.put("pageMaker", pageMaker); // 페이징, 검색조건 포함

	        return session.selectList("Funding-Mapper.selectListOrderBy", params);
	    }
	
	
	 @Override
	    public int selectHeartCountByFunding(int fno) throws SQLException {
	        return session.selectOne("Funding-Mapper.selectHeartCountByFunding", fno);
	    }
	
}
